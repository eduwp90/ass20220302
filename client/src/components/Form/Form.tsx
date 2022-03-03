import React from 'react'
import { Form, Input, DatePicker, FormItem, SubmitButton, Select } from 'formik-antd'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import { Button, Row, Col } from 'antd'
import * as Yup from 'yup'
import { tFormValues } from './FormTypes'
import { useDispatch } from 'react-redux'
import { setCommission } from '../../store/actions/commissionActions'
import { getCommission } from '../../services/ApiService'

const FormSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  date: Yup.date()
    .required('Required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Required')
    .positive('No negative numbers'),
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

  const onSetComission = (value: string) => {
    dispatch(setCommission(value))
  }

  const retrieveCommissionfromAPI = async (date:string, amount:string, currency: string, clientId: number) => {
    console.log(await getCommission({ date: date, amount: amount, currency: currency, client_id: clientId }))
  }

  return (
    <Formik
        initialValues={{
          date: '',
          amount: '',
          currency: 'EUR',
          client_id: ''
        }}
        onSubmit={(values: tFormValues, actions: FormikHelpers<tFormValues>) => {
          console.log(values)
          onSetComission('hello')
          retrieveCommissionfromAPI(values.date.split('T')[0], values.amount, values.currency, Number(values.client_id))

          // actions.setSubmitting(false)
          // actions.resetForm()
        }}
        validationSchema={FormSchema}
        render={(props: FormikProps<tFormValues>) => (
          <Form layout='vertical'>
            <div style={{ flex: 1 }} />
            <div style={{ background: 'white', flex: 1, padding: 40 }}>
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
                <DatePicker name='date' format='YYYY-MM-DD' disabled={props.isSubmitting}/>
              </FormItem>

              <Row style={{ marginTop: 60 }}>
                <Col offset={8}>
                  <Button.Group>
                    <SubmitButton>Submit</SubmitButton>
                  </Button.Group>
                </Col>
              </Row>
            </div>

          </Form>
        )}
      />
  )
}

export default FormComponent
