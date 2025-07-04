import '../styles/Modal.css';

export default function Modal(props: { children: React.ReactNode, onClose?: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
             onClick={props.onClose}>
            <div
                className="bg-[#1C212C] rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex flex-col gap-5 z-[10000] max-w-[90%] w-[700px] relative p-7 overflow-y-auto max-h-[90vh] custom-scrollbar"
                onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}
