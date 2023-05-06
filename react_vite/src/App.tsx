import { Layout } from "antd";
import GlobalRouter from "./router/Index";

export default function App() {
  return (
    <>
      <Layout>
        <GlobalRouter />
      </Layout>
    </>
  );
}