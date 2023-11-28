import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div><ConfigProvider theme={{
                token: {
                    /*"colorPrimary": "#dbbfa3",
                    "colorInfo": "#dbbfa3",*/
                }
            }}>{children}</ConfigProvider>
        </div>
    )
}
export default ThemeProvider