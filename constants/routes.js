export const root = "/";

export const PATH = {
  morePages: `${root}more-pages`,
  more: `${root}more`,
  users: {
    index: `${root}users`,
    add: `${root}users/create`,
    view: `${root}users/view`,
    edit: `${root}users/edit`
  },
  faq: {
    index: `${root}faq`,
    addQuestion: `${root}faq/add-question`
  },
  operator: {
    home: `${root}operator/home`,
    program: `${root}operator/program`
  },
  supervisor: {
    home: `${root}supervisor/home`,
    program: `${root}supervisor/program`,
    editHome: `${root}supervisor/edit-home`,
    pageStats: `${root}supervisor/pages-stats`,
  },
  catalogs: {
    contest: {
      index: `${root}contest`,
      create: `${root}contest/create`,
      view: `${root}contest/view`,
      edit: `${root}contest/edit`,
    },
    kcp: {
      edit: `${root}kcp/edit`,
      create: `${root}kcp/create`,
      view: `${root}kcp/view`,
      index: `${root}kcp`,
      more: `${root}base-pages/more`
    },
    ContractPoint: {
      index: `${root}contract-point`,
      create: `${root}contract-point/create`,
      edit: `${root}contract-point/edit`,
      view: `${root}contract-point/view`,
      index: `${root}contract-point`,
      more: `${root}base-pages/more`
    },
    lessonSchedule: {
      edit: `${root}lesson-schedule/edit`,
      create: `${root}lesson-schedule/create`,
      view: `${root}lesson-schedule/view`,
      index: `${root}lesson-schedule`
    },
    privilege: {
      edit: `${root}privilege/edit`,
      create: `${root}privilege/create`,
      view: `${root}privilege/view`,
      index: `${root}privilege`
    },
    price: {
      index: `${root}price`,
      create: `${root}price/create`,
      edit: `${root}price/edit`,
      view: `${root}price/view`
    },
    timeTraining: {
      index: `${root}time-training`,
      create: `${root}time-training/create`,
      edit: `${root}time-training/edit`,
      view: `${root}time-training/view`
    },
    formsTraining: {
      edit: `${root}forms-training/edit`,
      create: `${root}forms-training/create`,
      view: `${root}forms-training/view`,
      index: `${root}forms-training`
    },
    levelEducation: {
      edit: `${root}level-education/edit`,
      create: `${root}level-education/create`,
      view: `${root}level-education/view`,
      index: `${root}level-education`
    },
    subject: {
      edit: `${root}subject/edit`,
      create: `${root}subject/create`,
      view: `${root}subject/view`,
      index: `${root}subject`
    },
    directions: {
      edit: `${root}directions/edit`,
      create: `${root}directions/create`,
      view: `${root}directions/view`,
      index: `${root}directions`,
      more: `${root}directions-pages/more`
    },
    degree: {
      edit: `${root}degree/edit`,
      create: `${root}degree/create`,
      view: `${root}degree/view`,
      index: `${root}degree`
    },
    minPoint: {
      edit: `${root}min-point/edit`,
      create: `${root}min-point/create`,
      view: `${root}min-point/view`,
      index: `${root}min-point`
    },
    languages: {
      edit: `${root}languages/edit`,
      create: `${root}languages/create`,
      view: `${root}languages/view`,
      index: `${root}languages`
    },
    educationPrograms: {
      index: `${root}selection-committee/education-programs`,
      create: `${root}selection-committee/education-programs/create`,
      edit: `${root}selection-committee/education-programs/edit`,
      more: `${root}selection-committee-pages/more`,
      view: {
        index: `${root}selection-committee/education-programs`,
        children: {
          acceptance: "acceptance",
          program: "program",
          competencies: "competencies",
          disciplines: "disciplines",
          cooperation: "cooperation",
          benefits: "benefits",
          employers: "employers",
          teachers: "teachers",
          contacts: "contacts"
        }
      }
    },
    publishingPrograms: {
      index: `${root}publishing-programs/education-programs`,
      create: `${root}publishing-programs/education-programs/create`,
      edit: `${root}publishing-programs/education-programs/edit`,
      more: `${root}publishing-programs-pages/more`,
      view: {
        index: `${root}publishing-programs/education-programs`,
        children: {
          acceptance: "acceptance",
          status: "status",
          program: "program",
          competencies: "competencies",
          disciplines: "disciplines",
          cooperation: "cooperation",
          benefits: "benefits",
          employers: "employers",
          teachers: "teachers",
          contacts: "contacts",
          faq: "faq"
        }
      }
    },
    transfers: {
      edit: `${root}transfers/edit`,
      create: `${root}transfers/create`,
      view: `${root}transfers/view`,
      index: `${root}transfers`
    },
    recovery: {
      edit: `${root}recovery/edit`,
      create: `${root}recovery/create`,
      view: `${root}recovery/view`,
      index: `${root}recovery`,
      more: `${root}recovery-pages/more`
    },
    description: {
      index: `${root}description`,
      view: `${root}description/view`,
      edit: `${root}description/edit`
    },
    faculty: {
      index: `${root}faculty`,
      create: `${root}faculty/create`,
      edit: `${root}faculty/edit`,
      view: `${root}faculty/view`,
    },
    competitionType: {
      index: `${root}competition-type`,
      edit: `${root}competition-type/edit`,
      create: `${root}competition-type/create`,
      view: `${root}competition-type/view`
    }
  },
  portfolioAchievements: {
    index: `${root}portfolio`,
    create: `${root}portfolio/create`,
    edit: `${root}portfolio/edit`,
    more: `${root}portfolio-pages/more`
  },
  unit: {
    edit: `${root}unit/edit`,
    create: `${root}unit/create`,
    view: `${root}unit/view`,
    index: `${root}unit`
  },
  contacts: {
    edit: `${root}contacts/edit`,
    create: `${root}contacts/create`,
    view: `${root}contacts/view`,
    index: `${root}contacts`
  },
  additionalDirectories: {
    more: `${root}additional-directories/more`,
    partners: {
      index: `${root}additional-directories/partners`,
      create: `${root}additional-directories/partners/create`,
      edit: `${root}additional-directories/partners/edit`,
      view: `${root}additional-directories/partners/view`
    },
    accreditationOrganization: {
      index: `${root}additional-directories/accreditation-organization`,
      create: `${root}additional-directories/accreditation-organization/create`,
      edit: `${root}additional-directories/accreditation-organization/edit`,
      view: `${root}additional-directories/accreditation-organization/view`
    },
    accreditation: {
      index: `${root}additional-directories/accreditation`,
      create: `${root}additional-directories/accreditation/create`,
      edit: `${root}additional-directories/accreditation/edit`,
      view: `${root}additional-directories/accreditation/view`
    },
    employer: {
      index: `${root}additional-directories/employer`,
      create: `${root}additional-directories/employer/create`,
      edit: `${root}additional-directories/employer/edit`,
      view: `${root}additional-directories/employer/view`
    }
  },
  internationalCertificates: {
    index: `${root}certificates`,
    create: `${root}certificates/create`,
    edit: `${root}certificates/edit`
  },
  feedback: `${root}feedback`,
  feedbackAdmin: `${root}feedback-admin`,
  accessControl: `${root}accessControl`
};
