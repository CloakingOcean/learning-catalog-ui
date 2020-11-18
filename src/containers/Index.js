import React from "react";

import DeleteButton from "../components/DeleteButton";

import { Link } from "react-router-dom";

import { Button } from "reactstrap";

import {
  setStateObjectProperty,
  deleteItemFromStateArrayByMongoId,
} from "../components/util/StateUtil";

import "./Index.scss";

function Index() {
  const [definitions, setDefinitions] = React.useState();

  const [maxColumnLengths, setMaxColumnLengths] = React.useState({});
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  /* 

    Contains the maximum length of grouped categories.
    This allows us to correctly layout the table.

    {
        artists: 3
        supporters: 4
    }

  */

  React.useEffect(async function () {
    const url = `${REACT_APP_API_URL}/api/definitions`;

    const response = await fetch(url);
    const data = await response.json();
    if (definitions === undefined) {
      setDefinitions(data);

      Object.keys(data[0])
        .filter((field) => Array.isArray(data[0][field]))
        .forEach((field) => {
          let maxFieldLength = 0;

          data.forEach((definition) => {
            if (definition[field].length > maxFieldLength) {
              maxFieldLength = definition[field].length;
            }
          });

          setStateObjectProperty(
            maxColumnLengths,
            setMaxColumnLengths,
            field,
            maxFieldLength
          );
        });
    }
  }, []);

  function updateDelete(id) {
    deleteItemFromStateArrayByMongoId(songs, setSongs, id);
  }

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Definition</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {definitions !== undefined &&
            definitions.map((definition) => {
              return (
                <tr key={definition._id}>
                  <td>{definition.term}</td>
                  <td>{definition.definition}</td>
                  <td>
                    <Link
                      to={`/api/definitions/updateDefinition/${encodeURI(
                        definition._id
                      )}`}
                    >
                      <Button color="primary">Update</Button>
                    </Link>
                  </td>
                  <td>
                    <DeleteButton
                      definitionProp={definition}
                      updateDelete={updateDelete}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Link to="api/definitions/createDefinition">
        <Button color="success">Create Definition</Button>
      </Link>
    </main>
  );
}

export default Index;
