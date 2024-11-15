import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({ remainingTime, targetTime, onReset }, ref)//forwarding ref could onyl be done with this special function known as forwardRef and then the forwared ref should be provided as a second arguement after the props in the component, the ref is forwarded. {
{
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 - (remainingTime/(targetTime*1000))) * 100)

    useImperativeHandle(ref, () => {//This Hook here is used to detach the dialog element from the dialog.current.showModal() function, which is invoked in the TimeChallenge component, bcoz if dialog element changes to div element by any other collaborator, then the connection of that showModal function will be lost.
        return {
            open(){
                dialog.current.showModal();
            }
        };
    });

  return (
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You Lost!</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
