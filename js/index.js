// Загрузка header.html
fetch("components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data
  })

// Загрузка footer.html
fetch("components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data
  })

// массив с данными
const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 14, 20),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
]

// форматируем дату
const formatEventDate = (date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date)

  const get = (type) => parts.find((p) => p.type === type)?.value

  return `${get("weekday")}, ${get("month")} ${get("day")} · ${get("hour")}:${get("minute")} ${get("dayPeriod")}`
}

// рендерим карточки событий
// Основная универсальная функция
function renderEventsToSection(arr, targetSection) {
  if (targetSection) targetSection.innerHTML = ""

  const eventsContent = document.createElement("div")
  eventsContent.classList.add("events__content")

  arr.forEach((elem) => {
    if (!elem.attendees) {
      elem.attendees = 0
    }

    const event = document.createElement("div")
    event.classList.add("event")
    event.innerHTML = `
        <div class="event__img-wrapper"><a href="#"><img class="event__img"  src=${elem.image} alt="event"></a>
            ${
              elem.type === "online"
                ? '<img class="event__type" src="./assets/svg/online-event.svg" alt="online">'
                : ""
            }
        </div>
        <div class="event__wrapper"><h3 class="event__title">${elem.title}</h3>
        <p class="event__category">${elem.category} (${elem.distance} km)</p>
        <p class="event__date">${formatEventDate(elem.date)}</p>
        
        <div class="event-row"><p class="event__going">${elem.attendees} going</p>
        <p class="availability">Free</p></div>
          ${
            elem.type === "online"
              ? '<img class="event__type-mobile" src="./assets/svg/online-event.svg" alt="online">'
              : ""
          }
          <p class="event__attendees">${elem.attendees} attendies</p>
         </div>
         
          `
    eventsContent.append(event)
  })
  targetSection.append(eventsContent)
}

const eventsSection = document.querySelector(".events__wrapper")
// Функция для .events
function renderAllEvents(arr) {
  if (!eventsSection) return
  renderEventsToSection(arr, eventsSection)
}

// Функция для .online-events
function renderOnlineEvents(arr) {
  const onlineEventsSection = document.querySelector(".online-events__wrapper")
  if (!onlineEventsSection) return
  const onlineOnly = arr.filter((event) => event.type === "online")
  renderEventsToSection(onlineOnly, onlineEventsSection)
}

renderAllEvents(eventsStore) // все события в .events
renderOnlineEvents(eventsStore) // только онлайн в .online-events

// фильтрация мероприятий

const categorySelect = document.getElementById("category")
const typeSelect = document.getElementById("type")
const distanceSelect = document.getElementById("distance")
const daySelect = document.getElementById("day")

// При изменении фильтра:
function updateAllFilters() {
  const selectedCategory = categorySelect.value
  const selectedType = typeSelect.value
  const selectedDistance = distanceSelect.value
  const selectedDay = daySelect.value

  console.log("Выбранные фильтры:", {
    category: selectedCategory,
    type: selectedType,
    distance: selectedDistance,
    day: selectedDay,
  })

  // Фильтрация массива eventsStore
  let filtered = [...eventsStore]

  if (selectedCategory) {
    filtered = filtered.filter((elem) => elem.category === selectedCategory)
  }
  if (selectedType) {
    filtered = filtered.filter((elem) => elem.type === selectedType)
  }
  // if (selectedType === "online" && selectedDistance) {
  //   selectedDistance = "Any distance"
  // }
  if (selectedDistance) {
    filtered = filtered.filter((elem) => elem.distance <= selectedDistance)
  }
  if (selectedDay) {
    const selectedDate = new Date(selectedDay)
    filtered = filtered.filter(
      (elem) => elem.date.toDateString() === selectedDate.toDateString(),
    )
  }
  console.log("Отфильтровано событий:", filtered.length)

  if (filtered.length === 0) {
    eventsSection.innerHTML = `<p class="message">Мероприятия отсутствуют</p>`
    return
  }

  // показываем итоговые события
  renderAllEvents(filtered)
}

categorySelect.addEventListener("change", updateAllFilters)
typeSelect.addEventListener("change", updateAllFilters)
distanceSelect.addEventListener("change", updateAllFilters)
daySelect.addEventListener("change", updateAllFilters)

// Первоначальная загрузка
updateAllFilters()
