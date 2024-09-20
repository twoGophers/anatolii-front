import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showMobileMenuLink } from "@/store/slices/ui";
import { useRouter } from "next/router";
import Navigation from "../Catalog/Navigation";

export default function MenuMobile() {
  const show = useAppSelector((state) => state.ui.showMobileMenuLink.show);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(showMobileMenuLink(false));
  };


  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      className="menu-mobile-side-drawer pt-2"
    >
      <Offcanvas.Header closeButton className="">
        <Offcanvas.Title>Menu </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0 overflow-x-hidden">
        <div className="">
            <Navigation />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
