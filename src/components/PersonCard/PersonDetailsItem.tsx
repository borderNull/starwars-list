import { useState, SetStateAction, ChangeEvent, Dispatch } from "react";
import { DateTime } from "luxon";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import {
  PROPS_TO_EXCLUDE,
  DATE_PROPS,
  READ_ONLY_FIELDS,
  DATE_FORMAT,
  NUMBER_FIEDS,
} from "./constants";
import { urlString, normalizeName, arrayOrUrl } from "./helpers";
import { ValueTypes } from "../../types";

import PersonDetailsSubList from "./PersonDetailsSubList";

import {
  PersonDetailsRow,
  PersonDetailsTitle,
  PersonEditInput,
  PersonDetailsText,
} from "./styles";

interface IPersonDetails {
  name: string;
  value: ValueTypes;
  editMode?: boolean;
  editPerson?: Dispatch<SetStateAction<Record<string, string>>>;
}

const PersonDetailsItem = ({
  name,
  value,
  editMode,
  editPerson,
}: IPersonDetails) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleEditField = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (editPerson) {
      editPerson((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const renderDetailsContent = (name: string, value: ValueTypes) => {
    if (!Array.isArray(value) && !urlString(value)) {
      if (editMode && !READ_ONLY_FIELDS.includes(name)) {
        return (
          <PersonEditInput
            value={value}
            size="small"
            onChange={handleEditField}
            type={NUMBER_FIEDS.includes(name) ? "number" : "text"}
          />
        );
      } else {
        const normalizedValue = DATE_PROPS.includes(name)
          ? DateTime.fromISO(value).toFormat(DATE_FORMAT)
          : value;
        return <PersonDetailsText>{normalizedValue}</PersonDetailsText>;
      }
    }

    if (arrayOrUrl(value)) {
      return (
        <IconButton onClick={handleToggleExpand}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      );
    }

    if (!value.length) {
      return <PersonDetailsText>n/a</PersonDetailsText>;
    }

    return null;
  };

  const renderSubList = (value: ValueTypes) => {
    const normalizedSource = Array.isArray(value) ? value : [value];
    return normalizedSource.map((src, index) => {
      return <PersonDetailsSubList key={`${index}_array_level`} source={src} />;
    });
  };

  if (PROPS_TO_EXCLUDE.includes(name)) return;

  return (
    <Box>
      <PersonDetailsRow>
        <PersonDetailsTitle variant="subtitle1">
          {normalizeName(name)}
        </PersonDetailsTitle>
        {renderDetailsContent(name, value)}
      </PersonDetailsRow>
      {expanded && arrayOrUrl(value) && renderSubList(value)}
    </Box>
  );
};

export default PersonDetailsItem;
