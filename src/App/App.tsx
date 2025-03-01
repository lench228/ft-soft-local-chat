import { Providers } from "app/providers";
import { AppRouter } from "app/routers";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  return (
    <Providers>
      <RouterProvider router={AppRouter}></RouterProvider>
    </Providers>
  );
}

export default App;
