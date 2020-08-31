import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addUserInit, selectUser } from "../../../people/store";
import { toBackslashFormat } from "../../../services/date.service";
import { NiHeader } from "../../../shared";
import { RootState } from "../../../store/store";
import { loadOrdersInit } from "../store/actions";
import { DayOfWeek, Order } from "../store/order-state";
import { selectOrderByDay, selectOrders } from "../store/selectors";
import "../styles/weekly-orders.scss";
import OrderCard from "./OrderCard";

const days = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY];

function UserWeeklyOrders() {
  const dispatch = useDispatch();
  const { userId, date } = useParams<{ userId: string, date: string }>();
  const orders = useSelector((state: RootState) => selectOrders(state));
  const user = useSelector((state: RootState) => selectUser(state, userId));
  const formattedDate = toBackslashFormat(date);

  useEffect(() => {
    dispatch(loadOrdersInit(formattedDate, userId));
    dispatch(addUserInit(userId));
  }, [dispatch, userId]);


  return (
    <div className='weekly-orders'>
      <NiHeader backArrow={true} logo={false} menu={true} title="Food" />
      <div className="weekly-orders__title">{user?.fullName}</div>
      <div className='weekly-orders__days'>
        {days.map(day =>
          <OrderCard disableActions={true} key={day} {...selectOrderByDay(orders, day) as Order} day={day} />
        )}
      </div>

      <div className="weekly-orders__actions">
        <button className="ni-button ni-button--small ni-button__contained ni-button__contained--primary">Save</button>
      </div>
    </div>
  )
}

export default UserWeeklyOrders;
