import React, { FC } from "react";

import { Provider } from "react-redux";
import store from "app/store";

interface IProvider {
    children: React.ReactNode;
}

export const Providers: FC<IProvider> = ({ children }: IProvider) => {
    return <Provider store={store}>{children}</Provider>;
};
