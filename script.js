// Input variables
const titleInp = document.querySelector(".title-inp input");
const dateInp = document.querySelector(".date-inp input");
const locationInp = document.querySelector(".location-inp input");
const attendeesInp = document.querySelector(".attendees-inp input");

// Btn variables
const eventBtn = document.querySelector("#event-btn");
const calendarBtn = document.querySelector("#calendar-btn");
const addEventBtn = document.querySelector("#add-event")
const clearEventBtn = document.querySelector("#clear-event")

// list container variables
const eventListTable = document.querySelector(".eventList-section table tbody")
const weekEventsList  = document.querySelector(".weekEvents-list")
const events = []
const weekEvents = []
// Functions
    // renderPage : Renders the page's origin state
    const renderPage = ()=>{

        eventListTable.innerHTML = events.map(event=>event).join("")
        weekEvents.innerHTML = weekEvents.map(event=>event).join("")
        
    }

    

    // addEvent : Adds Events from the input fields to the event list
    const addEvent = ()=>{
        const newTableRow  = `
            <tr>
                <td>${dateInp.value}</td>
                <td>${locationInp.value}</td>
                <td>${titleInp.value}</td>
                <td>${attendeesInp.value}</td>
                <td><button class="btn" onclick="deleteEvent()">Delete</button></td>    
            </tr>
        `;
        events.push(newTableRow);
        updateEventCookies()        
    }

    // deleteEvent : Deletes Events from the event list
    const deleteEvent = ()=>{

    }

    // showWeekEvents : Shows all the events within a week
    const showWeekEvents  = ()=>{

    }

    // showMostAttendees : Shows the event with the most attendees
    const showMostAttendees = ()=>{

    }
    /* // updateEventCookies: Updates cookies of the eventsList
    const updateEventCookies = ()=>{

        renderPage()
    }

    // updateWeekEventCookies: Updates cookies of the eventsList
    const updateWeekEventCookies = ()=>{

    } */
    renderPage()