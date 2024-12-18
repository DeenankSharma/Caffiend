import ReactDOM from "react-dom";

export default function Modal(props: any) {
  const portalElement = document.getElementById('portal');

  if (!portalElement) {
    console.error("Portal element with ID 'portal' not found.");
    return null; // Or fallback UI if needed
  }
  

  return ReactDOM.createPortal(
    <div className="modal-container">
      <button disabled={true} onClick={props.handleCloseModal} className="modal-underlay">
        <div  className="modal-content">{props.children}</div>
      </button>
    </div>,
    portalElement
  );
}