import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { DateTime } from "luxon";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import PersonDetailsItem from "./PersonDetailsItem";
import Spinner from "../shared/Spinner";
import ErrorText from "../shared/ErrorText";

import api from "./api";
import { checkObjectIsEmpty } from "./helpers";
import { ValueTypes } from "../../types";

import {
  PersonPaper,
  PersonCardWrap,
  PersonDetails,
  PersonChangeButton,
  PersonCancelButton,
  PersonAction,
  PersonActionButtons,
} from "./styles";

const PersonCard = () => {
  const { personId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [api.person.key, personId],
    queryFn: () => api.person.fn(personId),
  });

  const [person, setPerson] = useState<typeof data | null>(null);
  const [editablePerson, setEditablePerson] = useState<typeof data | null>(
    null
  );

  const toggleEditPerson = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleSavePerson = () => {
    setPerson({ ...editablePerson, edited: DateTime.now() });
    setEditMode(false);
  };

  const handleCancelEditPerson = () => {
    setEditablePerson(person);
    setEditMode(false);
  };

  const handleNavigateToList = () => {
    navigate("/");
  };

  useEffect(() => {
    setPerson(data);
    setEditablePerson(data);
  }, [data]);

  if (
    isLoading ||
    checkObjectIsEmpty(person) ||
    checkObjectIsEmpty(editablePerson)
  ) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorText error={error as string} />;
  }

  const personByCondition: Record<string, ValueTypes> = editMode
    ? editablePerson
    : person;

  return (
    <PersonCardWrap>
      <PersonAction>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleNavigateToList}
        >
          Go to List
        </Button>
      </PersonAction>
      <PersonPaper elevation={3}>
        <PersonDetails>
          {Object.entries(personByCondition).map((entry) => {
            const [key, value] = entry;
            return (
              <PersonDetailsItem
                key={`${key}_first_level`}
                name={key}
                value={value}
                editMode={editMode}
                editPerson={setEditablePerson}
              />
            );
          })}
        </PersonDetails>
      </PersonPaper>
      <PersonActionButtons>
        <PersonChangeButton
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={editMode ? handleSavePerson : toggleEditPerson}
        >
          {editMode ? "Save" : "Edit"} Person
        </PersonChangeButton>
        {editMode && (
          <PersonCancelButton
            variant="outlined"
            endIcon={<ClearIcon />}
            onClick={handleCancelEditPerson}
          >
            Cancel
          </PersonCancelButton>
        )}
      </PersonActionButtons>
    </PersonCardWrap>
  );
};

export default PersonCard;
