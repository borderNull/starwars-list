import { useQuery } from "react-query";

import PersonDetailsItem from "./PersonDetailsItem";
import Spinner from "../shared/Spinner";
import ErrorText from "../shared/ErrorText";
import { ValueTypes } from "../../types";

import api from "./api";

import { PersonDetails, PersonSubItemWrap } from "./styles";

interface IPresonDetailsSubList {
  source: string;
}

const PersonDetailsSubList = ({ source }: IPresonDetailsSubList) => {
  const {
    isLoading,
    isError,
    data = {},
    error,
  } = useQuery({
    queryKey: [api.subList.key, source],
    queryFn: () => api.subList.fn(source),
  });

  if (isLoading) {
    return <Spinner size={20} />;
  }

  if (isError) {
    return <ErrorText error={error as string} />;
  }

  console.log("data", data);

  return (
    <PersonSubItemWrap>
      <PersonDetails>
        {Object.entries(data as Record<string, ValueTypes>).map((entry) => {
          const [key, value] = entry;
          return (
            <PersonDetailsItem
              key={`${key}_second_level`}
              name={key}
              value={value}
            />
          );
        })}
      </PersonDetails>
    </PersonSubItemWrap>
  );
};

export default PersonDetailsSubList;
