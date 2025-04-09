
import notFound from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <img src={notFound} alt="Not Found" />
      </div>
    </>
  );
}
