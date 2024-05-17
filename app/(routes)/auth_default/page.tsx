import Login from "./components/login/login";
import Registration from "./components/login/registration";

export default function Auth() {

  return (
    <section>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-4 md:gap-10 lg:gap-20">
          <Login />
          <Registration />
        </div>
      </div>
    </section>
  );
}
