import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div><ConfigProvider theme={{
                token: {
                    colorPrimary: '#FFE0B2',
                }
            }}>{children}</ConfigProvider>
        </div>
    )
}
export default ThemeProvider