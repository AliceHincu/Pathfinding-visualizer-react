import Modal from "react-bootstrap/esm/Modal";
import Button from 'react-bootstrap/esm/Button';
import IntroductiveCarousel from "./IntroductiveCarousel";
import { HEIGHT } from "../../constants/dimensions";

interface IntroductiveModalProps {
    show: boolean;
    onHide: () => void;
}

const IntroductiveModal = ({show, onHide}: IntroductiveModalProps) => {
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          Tutorial
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{height: `${HEIGHT * 80/100}px`}}>
            <IntroductiveCarousel></IntroductiveCarousel>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default IntroductiveModal