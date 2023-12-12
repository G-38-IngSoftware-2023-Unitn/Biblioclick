import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div><ConfigProvider theme={{
                token: {
                    "colorPrimary": "#F9EFE5",
                }
            }}>{children}</ConfigProvider>
        </div>
    )
}
export default ThemeProvider