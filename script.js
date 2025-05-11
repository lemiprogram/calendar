// Input variables
const titleInp = document.querySelector(".title-inp input");
const dateInp = document.querySelector(".date-inp input");
const locationInp = document.querySelector(".location-inp input");
const attendeesInp = document.querySelector(".attendees-inp input");

// Btn variables
const eventBtn = document.querySelector("#event-btn");
const calendarBtn = document.querySelector("#calendar-btn");
const addEventBtn = document.querySelector("#add-Event");
const showMostAttendeesBtn = document.querySelector(".mostAttendees-btn button")
const closeModalBtn = document.querySelector("#close-btn")

// list container variables
const eventListTable = document.querySelector(".eventList-section table tbody");
const weekEventsList = document.querySelector(".weekEvents-list");

const monthNames = {
    full:[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      short:[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
}

// Constant variables
const DAYS_TO_MILISECONDS = 24*3600*1000;

// Functions
getCookie("events") === null?setCookie("events","[]"): "";
let events = JSON.parse(getCookie("events"));
let weekEvents; 
// renderPage : Renders the page's origin state
const renderPage = () => {
    setCookie("events",JSON.stringify(events))
    showWeekEvents();
    eventListTable.innerHTML = events
    .map(
        (event) => `
            <tr>
                <td class="item">${event.date}</td>      
                <td class="item">${event.location}</td>      
                <td class="item">${event.title}</td>      
                <td class="item">${event.attendees}</td>      
                <td>
                    <button class="btn"onclick="deleteEvent(this)">Delete</button>
                </td>
            </tr>
        `
    )
    .join("");

    weekEventsList.innerHTML = weekEvents
    .map(
        (event) =>
        `<p>${event.title}, at ${event.location}, on ${event.date} (in ${event.daysAway}day${event.daysAway === 1? "":"s"})</p>`
    )
    .join("\n");
    closeModal()
};

// addEvent : Adds Events from the input fields to the event list
const addEvent = () => {
  if(!dateInp.value){
    return messageModal("Input Error","When is the Event? You'd need to input a Date to save an event ")
  } 
  else if(!locationInp.value){
    return messageModal("Input Error","Where is it located? You'd need to input a Location to save an event ")

  } 
  else if(!titleInp.value){
    return messageModal("Input Error","What Event is it? You'd need to input a Title to save an event")
  } 
  else if(!attendeesInp.value){
    return messageModal("Input Error","How many people are attending the event? You'd need to input the number of Attendees to save an event")
  }
  else if(attendeesInp.value < 1){
    return messageModal("Input Error","You have to input a Positive Integer as the number of attendees")
  }
  /* else if(String(attendeesInp.value)){
    return messageModal("Input Error","You have to input a Positive Integer as the number of attendees")
  } */
  const newEvent = {
    date: dateInp.value,
    location: locationInp.value,
    title: titleInp.value,
    attendees: attendeesInp.value,
  };

  events.push(newEvent);
  renderPage();
  clearEvent();
};
const clearEvent = () => {
  titleInp.value = null;
  dateInp.value = null;
  locationInp.value = null;
  attendeesInp.value = null;
};

// deleteEvent : Deletes Events from the event list
const deleteEvent = (event) => {
    const deletedElement = event.parentElement.parentElement
    deletedElement.remove();
    const tableRows = eventListTable.querySelectorAll("tr");
    events = Array.from(tableRows).map(row=>{
      const [date, location, title, attendees] = row.querySelectorAll(".item")
      return {
        date: date.innerText,
        location: location.innerText,
        title: title.innerText,
        attendees: attendees.innerText,
      }
    })
    renderPage();
};

// showWeekEvents : Shows all the events within a week
const showWeekEvents = () => {
  const daysFromNow = (date) => {
    const today = new Date();
    return Math.ceil(
      (date.getTime() - today.getTime()) / (DAYS_TO_MILISECONDS)
    ); // (get the difference in time from today to the set date in miliseconds)/(convert it to days)
  };
  const arr = [];
  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const daysAway = daysFromNow(eventDate);
    if(daysAway >= 0 && daysAway <= 7){
      arr.push({
        title: event.title,
        date: event.date, 
        location: event.location,
        attendees: event.attendees,
        daysAway: daysAway,
      });
    }
  });
  weekEvents = arr;
};

// showMostAttendees : Shows the event with the most attendees
const showMostAttendees = () => {
    let eventCount = 0
    let eventIndex;
    events.forEach((event, index)=>{
        if(event.attendees>eventCount){
            eventCount = event.attendees;
            eventIndex = [index];
            
        }
        else if(event.attendees === eventCount){
            eventIndex.push(index)
        }

    })
    messageModal( `Most Attendees (${eventCount})`, `${eventIndex.map(i=>events[i].title).join("\n")}`)
};
    // setCookie : Creates a cookie
    function setCookie (name,value){
        const date = new Date();
        date.setTime(date.getTime + (3000*DAYS_TO_MILISECONDS));
        const expiresIn = `expires=${date.toUTCString()}`
        document.cookie = `${name}=${value}; ${expiresIn}; path=/`
    }
    
    //getCookie: Gets a cookie
    function getCookie(name){
        const cDecoded = decodeURIComponent(document.cookie)
        const cookieKeyVals = cDecoded.split("; ")
        let cookieVal = null;
        cookieKeyVals.forEach((cookieKeyVal)=>{
            if(cookieKeyVal.startsWith(`${name}=`)){
                cookieVal = cookieKeyVal.substring(name.length + 1)
            }
        })
        return cookieVal
        
    }
    //messageModal: prompts a message modal instead of messageModals 
    function messageModal(heading,msg){
      document.querySelector(".messageModal").style.display = "grid"
      document.querySelector(".content-text").innerText = msg
      document.querySelector(".content-heading").innerText = heading
    }
    //closeModal: closes the modal 
    function closeModal(){
      document.querySelector(".messageModal").style.display = "none"
      document.querySelector(".content-text").innerText =""
      document.querySelector(".content-heading").innerText = ""
    }
    addEventBtn.addEventListener("click", addEvent);
    showMostAttendeesBtn.addEventListener("click", showMostAttendees);
    closeModalBtn.addEventListener("click",closeModal)
    window.onclick = event=>{
      if(event.target === document.querySelector(".messageModal")){
          closeModal()
      }
    }


renderPage()