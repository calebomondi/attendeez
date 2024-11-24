import Table from "./table"
import NavBar from "../navbar/navbar"

export default function Timetable() {
  return (
    <>
      <NavBar />
      <main className="flex justify-center w-full">
        <div className="sm:w-1/2 m-5">
          <div className="collapse collapse-arrow bg-base-200 mb-2">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">Monday</div>
            <Table day_id={1} />
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-2">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Tuesday</div>
            <Table day_id={2} />
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-2">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Wednesday</div>
            <Table day_id={3} />
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-2">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Thursday</div>
            <Table day_id={4} />
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-2">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Friday</div>
            <Table day_id={5} />
          </div>
        </div>
      </main>
    </>
  )
}
