import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showMobileMenu } from '@/store/slices/ui';

export default function MenuMobile() {
  const show = useAppSelector((state) => state.ui.modalMobileMenu.show);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(showMobileMenu(false));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" className="menu-mobile-side-drawer">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="menu-mobile-content">
          <p>Your content here</p>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
