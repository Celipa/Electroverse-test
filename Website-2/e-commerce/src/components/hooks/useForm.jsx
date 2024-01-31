import { useState } from "react"
import { validate } from "../../utils/validate"



const useForm = (formData) => {
  const [form, setForm] = useState({...formData})
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const {name, value} = e.target

    setForm(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = (e, cb) => {
    e.preventDefault()

    if(!validate(form, setErrors)) {
      setErrors(err => ({
        ...err,
        main: 'Please enter all fields correctly'
      }))

      return
    }


    cb(form)

  }

  const handleBlur = e => {
    validate(form, setErrors, e)
  }

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  }
}
export default useForm