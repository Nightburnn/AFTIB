import React, { useState, useEffect } from "react";
import { useLoading } from "../../../Components/LoadingContext";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

export function ClientTransactiofewnList() {
  let { setLoading, setLoadingText } = useLoading();
  let userData = useSelector((state) => state.userData);
  console.log({ userData });
  return <div>transactions</div>;
}
