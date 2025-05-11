// Input variables
const titleInp = document.querySelector(".title-inp input");
const dateInp = document.querySelector(".date-inp input");
const locationInp = document.querySelector(".location-inp input");
const attendeesInp = document.querySelector(".attendees-inp input");

// Btn variables
const eventBtn = document.querySelector("#event-btn");
const calendarBtn = document.querySelector("#calendar-btn");
const addEventBtn = document.querySelector("#add-Event");
const clearEventBtn = document.querySelector("#clear-Event");
const showMostAttendeesBtn = document.querySelector(".mostAttendees-btn button")

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
const renderPage = (newRender = false) => {
    setCookie("events",JSON.stringify(events))
    console.log(getCookie("events"))
    showWeekEvents();
    eventListTable.innerHTML = events
    .map(
        (event) => `
            <tr>
                <td>${event.date}</td>      
                <td>${event.location}</td>      
                <td>${event.title}</td>      
                <td>${event.attendees}</td>      
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
};

// addEvent : Adds Events from the input fields to the event list
const addEvent = () => {
  if (
    !dateInp.value ||
    !locationInp.value ||
    !titleInp.value ||
    !attendeesInp.value||
    attendeesInp.value < 1
  ) {
    return alert("All event field should be filled in");
  }
  const newEvent = {
    date: dateInp.value,
    location: locationInp.value,
    title: titleInp.value,
    attendees: attendeesInp.value,
  };

  events.push(newEvent);
  renderPage();
};
const clearEvent = () => {
  titleInp.value = null;
  dateInp.value = null;
  locationInp.value = null;
  attendeesInp.value = null;
};

// deleteEvent : Deletes Events from the event list
const deleteEvent = (event) => {
    
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
  weekEvents = arr
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
    alert(`${eventIndex.map(i=>events[i].title).join("\n")}`)
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

addEventBtn.addEventListener("click", addEvent);
clearEventBtn.addEventListener("click", clearEvent);
showMostAttendeesBtn.addEventListener("click", showMostAttendees);


setCookie("delta", "fiction")
setCookie("bravo", "trix")
console.log(getCookie("delta"))
renderPage(1);
