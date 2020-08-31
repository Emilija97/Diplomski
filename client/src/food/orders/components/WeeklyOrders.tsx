import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderBackgroundImage } from "../../../assets";
import { NiHeader } from "../../../shared";
import { RootState } from "../../../store/store";
import { loadOrdersInit } from "../store/actions";
import { DayOfWeek, Order } from "../store/order-state";
import { selectOrderByDay, selectOrders } from "../store/selectors";
import "../styles/weekly-orders.scss";
import OrderCard from "./OrderCard";

const days = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY];

function WeeklyOrders() {
  const dispatch = useDispatch();

  const { loggedUserId, loggedUserName } = useSelector((state: RootState) => state.auth);
  const orders = useSelector((state: RootState) => selectOrders(state));

  useEffect(() => {
    dispatch(loadOrdersInit(new Date().toLocaleDateString(), loggedUserId))
  }, [dispatch, loggedUserId])

  return (
    <div className='weekly-orders'>
      <div className="weekly-orders__header">
        <img alt="" src={OrderBackgroundImage} className="weekly-orders__background" />
        <NiHeader backArrow={true} logo={false} menu={true} title="Food" />
        <div className="weekly-orders__welcome-text">
          <div className="weekly-orders__h5">Hello {loggedUserName},</div>
          <div >let's make an order for you</div>
        </div>
      </div>

      <div className='weekly-orders__days'>
        {days.map(day =>
          <OrderCard key={day} {...selectOrderByDay(orders, day) as Order} day={day} />
        )}
      </div>

      <div className="weekly-orders__actions">
        <button className="ni-button ni-button--small ni-button__contained ni-button__contained--primary">Save</button>
      </div>
    </div>
  )
}

export default WeeklyOrders;
