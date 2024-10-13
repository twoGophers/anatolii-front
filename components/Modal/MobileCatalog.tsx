import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showMobileMenuLink } from "@/store/slices/ui";
import Navigation from "../Catalog/Navigation";
import ToggleSwitch from "../Header/ToggleSwitch";


export default function MenuMobile() {
  const show = useAppSelector((state) => state.ui.showMobileMenuLink.show);
  const { bgColor } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(showMobileMenuLink(false));
  };


  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      className={`${bgColor ? 'text-[#333]' : 'text-[#D1D1D1] bg-gray-600'} menu-mobile-side-drawer pt-2`}
    >
      <Offcanvas.Header closeButton className="mx-3 p-0">
        <Offcanvas.Title>Menu 
          <div className="my-1">
            <ToggleSwitch /> 
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0 overflow-x-hidden">
        <div className="">
            <Navigation />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
