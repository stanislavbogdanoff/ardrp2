import { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import {
  useAddWalletMutation,
  useGetAllWalletsQuery,
} from "../features/wallets/walletService";
import useUnAuthRedirection from "../hooks/useUnAuthRedirection";
import Section from "../components/layout/Section";
import PageTitle from "../components/layout/PageTitle";
import { useUser } from "../hooks/useUser";
import WalletCard from "../components/dashboard/WalletCard";
import { User, Wallet } from "../types";
import DashTabs from "../components/dashboard/DashTabs";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  // Redirect if not logged in
  useUnAuthRedirection();

  return (
    <>
      <Section ver>
        <PageTitle>Dashboard</PageTitle>
        <DashTabs />
      </Section>
      <Outlet />
    </>
  );
};

export default DashboardPage;
