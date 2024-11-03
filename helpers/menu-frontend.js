const getMenuFrontEnd = (role, modalidad) => {
  const menu = [];

  switch (role) {
    case "ADMIN_ROLE":
      if (modalidad === "JORNADA-TARDE") {
        menu.push(
          {
            titulo: "Inicio",
            icono: "RiHome5Fill",
            path: "/inicio",
          },
          {
            titulo: "Asignaturas",
            icono: "MdGrade",
            path: "/grados",
          },
          {
            titulo: "Usuarios",
            icono: "FaUsers",
            path: "/usuarios",
          },
          {
            titulo: "Estudiantes",
            icono: "RiUserStarFill",
            path: "/ceba/estudiantes",
          },
          // {
          //   titulo: "Pagos",
          //   icono: "MdMonetizationOn",
          //   path: "/ceba/pagos",
          // },
          {
            titulo: "Docentes",
            icono: "FaChalkboardTeacher",
            path: "/ceba/docentes",
          },
          {
            titulo: "Equipos",
            icono: "RiComputerFill",
            path: "/ceba/equipos",
          },
          {
            titulo: "Libros",
            icono: "RiBook3Fill",
            path: "/ceba/libros",
          },
          {
            titulo: "Reportes",
            icono: "FcPieChart",
            path: "/ceba/reportes",
          }
        );
      } else if (modalidad === "ESPECIALIDAD") {
        menu.push(
          {
            titulo: "Inicio",
            icono: "RiHome5Fill",
            path: "/inicio",
          },
          {
            titulo: "Asignaturas",
            icono: "MdGrade",
            path: "/grados",
          },
          {
            titulo: "Usuarios",
            icono: "FaUsers",
            path: "/usuarios",
          },
          {
            titulo: "Estudiantes",
            icono: "RiUserStarFill",
            path: "/residencia/estudiantes",
          },
          // {
          //   titulo: "Pagos",
          //   icono: "MdMonetizationOn",
          //   path: "/residencia/pagos",
          // },
          {
            titulo: "Reportes",
            icono: "FcPieChart",
            path: "/residencia/reportes",
          }
        );
      } else if (modalidad === "JORNADA-MAÑANA") {
        menu.push(
          {
            titulo: "Inicio",
            icono: "RiHome5Fill",
            path: "/inicio",
          },
          {
            titulo: "Asignaturas",
            icono: "MdGrade",
            path: "/grados",
          },
          {
            titulo: "Usuarios",
            icono: "FaUsers",
            path: "/usuarios",
          },
          {
            titulo: "Estudiantes",
            icono: "RiUserStarFill",
            path: "/ebr/estudiantes",
          },
          // {
          //   titulo: "Pagos",
          //   icono: "MdMonetizationOn",
          //   path: "/ebr/pagos",
          // },
          {
            titulo: "Docentes",
            icono: "FaChalkboardTeacher",
            path: "/ebr/docentes",
          },
          {
            titulo: "Equipos",
            icono: "RiComputerFill",
            path: "/ebr/equipos",
          },
          {
            titulo: "Libros",
            icono: "RiBook3Fill",
            path: "/ebr/libros",
          },
          {
            titulo: "Reportes",
            icono: "FcPieChart",
            path: "/ebr/reportes",
          }
        );
      }
      break;
    case "PROFESSOR_ROLE":
      if (
        ["JORNADA-MAÑANA", "JORNADA-TARDE", "ESPECIALIDAD"].includes(modalidad)
      ) {
        menu.push(
          {
            titulo: "Inicio",
            icono: "RiHome5Fill",
            path: "/inicio",
          },
          {
            titulo: "Asignaturas",
            icono: "MdGrade",
            path: "/grados",
          },
          {
            titulo: "Materiales",
            icono: "RiFileList2Line",
            path: "/ebr/profesor/materiales",
          },
          {
            titulo: "Evaluaciones",
            icono: "MdAssignment",
            path: "/ebr/profesor/evaluaciones",
          },
          {
            titulo: "Calificaciones",
            icono: "FaClipboardCheck",
            path: "/ebr/profesor/calificaciones",
          }
        );
      }
      break;
    case "STUDENT_ROLE":
      menu.push(
        {
          titulo: "Inicio",
          icono: "RiBook5Fill",
          path: "/inicio-estudiante",
        },
        {
          titulo: "Mis Materiales",
          icono: "RiBook2Fill",
          path: "/ebr/estudiante/materiales",
        },
        {
          titulo: "Mis Evaluaciones",
          icono: "MdAssignmentTurnedIn",
          path: "/ebr/estudiante/evaluaciones-estudiante",
        }
      );
      break;
  }

  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
