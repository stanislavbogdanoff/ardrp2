import styles from "./Dashboard.module.scss";
import Tab from "./Tab";

interface Tab {
  label: string;
  link: string;
}

const DashTabs = () => {
  const tabs: Tab[] = [
    {
      label: "Users",
      link: "/users",
    },
    {
      label: "Wallets",
      link: "/wallets",
    },
    {
      label: "Twitters",
      link: "/twitters",
    },
    {
      label: "Emails",
      link: "/emails",
    },
  ];
  return (
    <div className={styles.dash_tabs}>
      {Array.isArray(tabs) &&
        tabs.map((tab) => <Tab label={tab.label} link={tab.link} />)}
    </div>
  );
};

export default DashTabs;
