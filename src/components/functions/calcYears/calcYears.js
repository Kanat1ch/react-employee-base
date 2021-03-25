const calcYears = (born) => {
  let yearsOld = null

  const date = new Date
  const currentDate = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  }
  
  const birthday = new Date(born)
  const birthdayDate = {
    day: birthday.getDate(),
    month: birthday.getMonth(),
    year: birthday.getFullYear()
  }

  const yearsDif = currentDate.year - birthdayDate.year
  if (yearsDif <= 1) {
    return 0
  }

  if (currentDate.month < birthdayDate.month) {
    yearsOld = yearsDif - 1
  } else if (currentDate.month > birthdayDate.month) {
    yearsOld = yearsDif
  } else {
    if (currentDate.day < birthdayDate.day) {
      yearsOld = yearsDif - 1
    } else {
      yearsOld = yearsDif
    }
  }

  return yearsOld
}

export default calcYears