export async function getContactInfo() {
  return await fetch("https://ant-productions-crud.herokuapp.com/contact", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data);
}

export async function getAboutInfo() {
  return await fetch("https://ant-productions-crud.herokuapp.com/about", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data);
}

export async function getMotorcycleDiariesInfo() {
  return await fetch(
    "https://ant-productions-crud.herokuapp.com/motorcycle-diaries-page",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data);
}

export async function getMotorcycleDiariesVideos() {
  return await fetch(
    "https://ant-productions-crud.herokuapp.com/motorcycle-diaries",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data);
}

export async function getImages() {
  return await fetch("https://ant-productions-crud.herokuapp.com/locations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data);
}

export async function getEvents() {
  return await fetch(
    "https://ant-productions-crud.herokuapp.com/events?_sort=Date:DESC",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data);
}

export async function getEvent(id) {
  return await fetch(
    `https://ant-productions-crud.herokuapp.com/events/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data);
}

export async function getProductions() {
  return await fetch(
    "https://ant-productions-crud.herokuapp.com/productions?_sort=Date:DESC",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data);
}

export async function getProduction(id) {
  return await fetch(
    `https://ant-productions-crud.herokuapp.com/productions/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data);
}
