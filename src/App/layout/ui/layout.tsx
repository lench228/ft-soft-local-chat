import { Outlet, useOutletContext } from "react-router-dom";
import UseBroadcast from "shared/hooks/use-broadcast";
import { ContextType } from "app/layout/lib";

const Layout = () => {
  // Вообще ужасное решение, мне не нравится, но иначе я не смогу синхронить стейт
  // Проблема с разными вкладками, если юзер на чате пишет сообщения, они не доходят
  // До destination, и когда тот зайдет в чат ничего не увидит, а если отправит
  // Сообщение, прокинет сломанный стейт, так что нужно либо прокидывать всем
  // Страницам при каждом изменении актуальный стейт, для корректной работы,
  // С другой стороны будто было ошибкой делать многостраничку, уже переделывать не хочу,
  // Но будто бы это избавило от всех проблем, но это как-то неправильно в плане архитектуры приложения

  const reloadDistPage = UseBroadcast<string>({
    name: "broadCast",
    action: (payload) => {
      if (payload) {
        console.log(payload);
        window.location.reload();
      }
    },
  });

  return (
    <div>
      <Outlet context={{ reloadDistPage } satisfies ContextType} />
    </div>
  );
};

export default Layout;
