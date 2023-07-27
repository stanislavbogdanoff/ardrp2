import React, { useState, useEffect } from "react";
import PageTitle from "../../components/layout/PageTitle";
import { OnChangeFunctionType, TextInputEventType } from "../../types";
import Section from "../../components/layout/Section";
import TextInput from "../../components/inputs/TextInput";
import { useUser } from "../../hooks/useUser";
import { useCheckTwitterExistsMutation } from "../../features/twitters/twitterService";
import { PasteEventType } from "../../types";

const DiscordsTab = () => {
  const [discords, setDiscords] = useState("");

  const user = useUser();

  const [checkTwitter] = useCheckTwitterExistsMutation();

  const [twitterExists, setTwitterExists] = useState(true);

  const handleTwitterPaste = async (e: PasteEventType) => {
    await checkTwitter({
      twitter: String(e.target.value),
      token: String(user?.token),
    }).then((res) => {
      if ("data" in res) {
        setTwitterExists(res.data);
      } else {
        console.log("No data available");
      }
    });
  };

  return (
    <>
      <Section ver>
        <PageTitle>Discords</PageTitle>
        <textarea
          placeholder="Enter the discords"
          onChange={(e) => setDiscords(String(e.target.value))}
        ></textarea>
      </Section>
      <Section ver>
        <TextInput placeholder="discord" />
        <TextInput placeholder="email" />
        <div>
          <TextInput
            placeholder="twitter"
            onPaste={(e) => void handleTwitterPaste(e)}
          />
          {twitterExists ? <span>Exitst</span> : <span>Doesn't exist</span>}
        </div>
        <TextInput placeholder="address" />
      </Section>
    </>
  );
};

export default DiscordsTab;
