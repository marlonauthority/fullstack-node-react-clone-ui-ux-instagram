import React from "react";

import { Container } from "./styles";

export default function Heart(hearted) {
  console.log(hearted);
  return (
    <Container hearted={hearted}>
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15">
        <path d="M12.4713 0C10.7596 0 9.2698.95 8.5 2.3512 7.73.95 6.2404 0 4.5287 0 2.0274 0 0 2.0277 0 4.5287c0 5.2882 8.5 9.824 8.5 9.824S17 9.817 17 4.529C17 2.0277 14.9726 0 12.4713 0z" />
      </svg>
    </Container>
  );
}
