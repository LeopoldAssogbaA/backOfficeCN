import Apartments from "../components/Apartments";
import ApartmentsForm from "../components/Apartments/Form";
import ApartmentsDetails from "../components/Apartments/Details";
import Booking from "../components/Booking";
import BookingForm from "../components/Booking/Form";
import BookingDetails from "../components/Booking/Details";
import Customers from "../components/Customers";
import CustomerForm from "../components/Customers/Form";
import CustomersDetails from "../components/Customers/Details";
import Home from "../components/Home";
import Rooms from "../components/Rooms";
import RoomsForm from "../components/Rooms/Form";
import RoomsDetails from "../components/Rooms/Details";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Accueuil",
    component: () => <Home />,
  },
  {
    path: "/apartments",
    exact: true,
    name: "Appartements",
    component: () => <Apartments />,
  },
  {
    path: "/apartments/create",
    exact: true,
    name: "Appartements",
    component: () => <ApartmentsForm />,
  },
  {
    path: "/apartments/edit/:id",
    exact: false,
    name: "Appartements",
    component: () => <ApartmentsForm />,
  },
  {
    path: "/apartments/details/:id",
    exact: false,
    name: "Appartements",
    component: () => <ApartmentsDetails />,
  },
  {
    path: "/rooms",
    exact: true,
    name: "Chambres",
    component: () => <Rooms />,
  },
  {
    path: "/rooms/create",
    exact: true,
    name: "Chambres",
    component: () => <RoomsForm />,
  },
  {
    path: "/rooms/edit/:id",
    exact: false,
    name: "Chambres",
    component: () => <RoomsForm />,
  },
  {
    path: "/rooms/details/:id",
    exact: false,
    name: "Chambres",
    component: () => <RoomsDetails />,
  },
  {
    path: "/customers",
    exact: true,
    name: "Clients",
    component: () => <Customers />,
  },
  {
    path: "/customers/create",
    exact: false,
    name: "Clients",
    component: () => <CustomerForm />,
  },
  {
    path: "/customers/edit/:id",
    exact: false,
    name: "Clients",
    component: () => <CustomerForm />,
  },
  {
    path: "/customers/details/:id",
    exact: false,
    name: "Clients",
    component: () => <CustomersDetails />,
  },
  {
    path: "/booking",
    exact: true,
    name: "Réservations",
    component: () => <Booking />,
  },
  {
    path: "/booking/create",
    exact: true,
    name: "Réservations",
    component: () => <BookingForm />,
  },
  {
    path: "/booking/edit/:id",
    exact: false,
    name: "Réservations",
    component: () => <BookingForm />,
  },
  {
    path: "/booking/details/:id",
    exact: false,
    name: "Réservations",
    component: () => <BookingDetails />,
  },
];

export default routes;
