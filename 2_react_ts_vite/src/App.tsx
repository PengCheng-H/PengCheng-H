import { Layout } from "antd";
import Navigation from "./components/Navigation";
import { Content } from "antd/es/layout/layout";

export default function App() {
  return (
    <>
      <Layout>
        <Navigation />
      </Layout>
    </>
  );
}