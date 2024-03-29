import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useNotify = (message: string, type: "error" | "success") => {
    toast[type](message,
        {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
}