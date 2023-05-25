import { IoCaretBack } from "react-icons/io5";
import style from "./Back.module.css";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <div onClick={handleBack} className={style.backContainer}>
      <IoCaretBack size={50} color="var(--black)" className={style.icon} />
      <h3>Volver</h3>
    </div>
  );
}
