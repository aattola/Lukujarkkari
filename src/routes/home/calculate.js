import ical from './ical'
import dayjs from 'dayjs'

const getData = async (url) => {
  const res = await fetch(url)
  const data = await res.text()

  return data
}

export const calculate = async (urls) => {
    // load and parse this file without blocking the event loop
    const webEventsD = await getData(urls[0])
    const webEventsTopiasD = await getData(urls[1]);
    const webEvents = ical.parseICS(webEventsD)
    const webEventsTopias = ical.parseICS(webEventsTopiasD)


    // you can also use the async lib to download and parse iCal from the web
    // const webEvents = await ical.async.fromURL('https://kangasala.inschool.fi/schedule/export/students/40349/Wilma.ics?token=0240349xbdbec6a2e08e0f46e8e09938d7738089&p=28&f=56&tstamp=1618491636');
    // const webEventsTopias = await ical.async.fromURL('https://kangasala.inschool.fi/schedule/export/students/40281/Wilma.ics?token=0240281x01f5dce9cd388989a579ceec9c02b0b9&p=28&f=56&tstamp=1618491670');
    // also you can pass options to fetch() (optional though!)

    const eka = Object.entries(webEvents)
    const toka = Object.entries(webEventsTopias)

    let firstList = {}
    let sameList = []

    eka.forEach(ekka => {
      const event = ekka[1]
      if (event.type == "VEVENT") {
        firstList[event.summary] = event
      }
    })


    toka.forEach(tokka => {
      const event = tokka[1]
    console.log(toka, event )
      if (event.type == "VEVENT") {
        if (firstList[event.summary]) {
          // console.log(event)
          if (!event.rrule) return
          const until = event.rrule.split(';')[1]
          const endDat = until.split('=')[1]
          // const endDat = event.end
          const endDate = dayjs(endDat)
          const menikö = endDate.isBefore(dayjs())
          sameList[event.summary] = {...event, past: menikö}
        }
      }
    })

    const sameArray = Object.entries(sameList)

    const final = sameArray.map(semmone => {
      return {
        name: semmone[0],
        ...semmone[1]
      }
    })

    return final

}
