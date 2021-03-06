import React from 'react'
import { Form, Input, DatePicker, FormItem, SubmitButton, Select } from 'formik-antd'
import { Alert } from 'antd'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { tFormValues } from './FormTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setCommission } from '../../store/actions/commissionActions'
import { getCommission } from '../../services/ApiService'
import { useNavigate } from 'react-router-dom'
import './Form.css'
import { clearApiError, setApiError } from './../../store/actions/errorActions'
import { rootState } from './../../store/store'
import { errorState } from '../../store/reducers/errorReducer'
import moment from 'moment'

const FormSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  date: Yup.date()
    .required('Required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Required')
    .positive('No negative numbers')
    .moreThan(0, 'Amount bigger than 0'),
  currency: Yup.string().required('Required'),
  client_id: Yup.number()
    .typeError('Client ID must be a number')
    .required('Required')
    .positive('No negative numbers')
    .integer('No decimals allowed')
})

// eslint-disable-next-line no-undef
const selectAfter: JSX.Element = (
  <Select defaultValue='€' style={{ width: 60 }} name='currency' defaultActiveFirstOption={true} >
    <Select.Option value="EUR">€</Select.Option>
    <Select.Option value="USD">$</Select.Option>
    <Select.Option value="GBP">£</Select.Option>
    <Select.Option value="CNY">¥</Select.Option>
  </Select>
)

const FormComponent: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const apiError = useSelector<rootState, errorState>((state) => state.apiError)

  const onSetComission = (value: string) => {
    dispatch(setCommission(value))
  }

  const onSetApiError = (value: string) => {
    dispatch(setApiError(value))
  }

  const onClearApiError = () => {
    dispatch(clearApiError())
  }

  const retrieveCommissionfromAPI = async (date:string, amount:string, currency: string, clientId: number):Promise<string> => {
    const result = await getCommission({ date: date, amount: amount, currency: currency, client_id: clientId })
    return result.amount
  }

  const onSubmit = async (values: tFormValues, actions: FormikHelpers<tFormValues>) => {
    onClearApiError()
    try {
      const commission = await retrieveCommissionfromAPI(values.date.split('T')[0], values.amount, values.currency, Number(values.client_id))
      onSetComission(commission)

      actions.setSubmitting(false)
      actions.resetForm()

      navigate('/result')
    } catch (error: any) {
      console.log(error)
      onSetApiError('Error connecting to commission API')
    }
  }

  return (
    <Formik
        initialValues={{
          date: '',
          amount: '',
          currency: 'EUR',
          client_id: ''
        }}
        onSubmit={onSubmit}
        validationSchema={FormSchema}
        render={(props: FormikProps<tFormValues>) => (
          <Form layout='vertical'>

            <div className='form-container' >
              <h2>Calculate commission:</h2>
              <FormItem
                name="client_id"
                label="Client ID"
              >
                <Input name="client_id" placeholder="10" disabled={props.isSubmitting}/>
              </FormItem>
              <FormItem name="amount" label="Amount">
                <Input name="amount" placeholder={'1'} addonAfter={selectAfter} disabled={props.isSubmitting}/>
              </FormItem>
              <FormItem name="date" label="Transfer Date" >
                <DatePicker className='date-picker' name='date' format='YYYY-MM-DD' disabled={props.isSubmitting} disabledDate={(current) => current && current > moment().endOf('day')}/>
              </FormItem>
              {apiError.error && <Alert className='alert' message={apiError.msg} type="error" showIcon />}
              <SubmitButton >Submit</SubmitButton>

            </div>

          </Form>
        )}
      />
  )
}

export default FormComponent
