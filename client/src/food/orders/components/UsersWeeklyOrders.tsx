import { isSameWeek } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FoodIconImage, LeftArrowSmallImage, RightArrowSmallImage, ToPdfImage } from '../../../assets';
import { generateWeeksForPastMonths, toDashFormat } from '../../../services/date.service';
import { ListItem, NiHeader, NiIconButton } from '../../../shared';
import { RootState } from '../../../store/store';
import { loadUsersWeeklyOrdersInit } from '../store/actions';
import { selectUsersWhoOrderedInWeek } from '../store/selectors';
import "../styles/users-weekly-orders.scss";

const ORDERS_STORAGE_DURATION_IN_MONTHS = 3;

function UsersWeeklyOrders() {
  const dispatch = useDispatch();
  const history = useHistory();

  const weeks = generateWeeksForPastMonths(ORDERS_STORAGE_DURATION_IN_MONTHS);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(weeks.length - 1);
  const [selectedWeek, setSelectedWeek] = useState("This week");

  const users = useSelector((state: RootState) => selectUsersWhoOrderedInWeek(state, weeks[selectedWeekIndex]));

  useEffect(() => {
    dispatch(loadUsersWeeklyOrdersInit(weeks[selectedWeekIndex]))

    if (isSameWeek(new Date(), new Date(weeks[selectedWeekIndex]), { weekStartsOn: 1 })) {
      setSelectedWeek("This week");
    }
    else {
      setSelectedWeek(weeks[selectedWeekIndex]);
    }

  }, [selectedWeekIndex]);

  const handleUserClick = (id: string) => {
    history.push(`/orders/${id}/${toDashFormat(weeks[selectedWeekIndex])}`);
  }

  const handleDecreaseWeekClick = () => {
    if (selectedWeekIndex > 0) {
      setSelectedWeekIndex(selectedWeekIndex - 1);
    }
  }

  const handleIncreaseWeekClick = () => {
    if (selectedWeekIndex < weeks.length - 1) {
      setSelectedWeekIndex(selectedWeekIndex + 1);
    }
  }

  return (
    <div className="orders">
      <NiHeader backArrow={true} logo={false} menu={true} title="Orders" />

      <div className="orders__options">
        <div className="orders__week-navigation">
          <div className="orders__week">{selectedWeek}</div>
          <NiIconButton srcIcon={LeftArrowSmallImage} onClick={handleDecreaseWeekClick} />
          <NiIconButton srcIcon={RightArrowSmallImage} onClick={handleIncreaseWeekClick} />
        </div>
        <div className="orders__to-pdf">
          <NiIconButton srcIcon={ToPdfImage} />
        </div>
      </div>

      <div className="orders__list">
        {users.map(user => <ListItem
          image={user.imageSrc}
          title={user.fullName}
          key={user.id}
          subtext={user.position}
          contextIcon={FoodIconImage}
          className="orders__list-item"
          onClick={() => handleUserClick(user.id)}
        />)}
      </div>
    </div>
  )
}

export default UsersWeeklyOrders;