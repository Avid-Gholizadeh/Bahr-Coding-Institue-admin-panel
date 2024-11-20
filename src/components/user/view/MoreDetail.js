import React from 'react'
import { Card, CardBody, CardTitle, Row, Col, Badge } from 'reactstrap'
import fMoment from 'moment-jalaali'


export function MoreDetail({user}) {
  return (
    <Card className='p-2'>
      <CardTitle>
        مشخصات
      </CardTitle>
      <CardBody>
        <Row>
          <Col>
            <p>
              نام:
              {' '}
              {user.fName}
            </p>
            <p>
              نام خوانوادگی:
              {' '}
              {user.lName}
            </p>
            <p>
              شناسه:
              {' '}
              {user.id}
            </p>
            <p>
              شماره همراه:
              {' '}
              {user.phoneNumber}
            </p>
            <p>
              تاریخ ثبت نام:
              {' '}
              {fMoment(user.insertDate).locale('fa').format('jD jMMMM jYYYY')}
            </p>
            <p>
              لاگین 2 مرحله ای:
              {' '}
              <Badge color={user.twoStepAuth ? 'light-success' : 'light-danger'}>
                {user.twoStepAuth ? 'آری' : 'خیر'}
              </Badge>
            </p>
          </Col>
          <Col>
            <p>
              نام کاربری:
              {' '}
              {user.userName}
            </p>
            <p>
              ایمیل:
              {' '}
              {user.gmail}
            </p>
            <p>
              جنسبت:
              {' '}
              {user.gender? 'مرد':'زن'}
            </p>
            <p>
              کد ملی:
              {' '}
              {user.nationalCode}
            </p>
            <p>
              تاریخ تولد:
              {' '}
              {fMoment(user.birthDay).locale('fa').format('jD jMMMM jYYYY')}
            </p>
            <p>
              ایمیل بازیابی:
              {' '}
              {user.recoveryEmail?user.recoveryEmail:'بدون ایمیل بازیابی'}
            </p>
          </Col>

          <div>
            <p>درباره کاربر:</p>
            <p>
              {user.userAbout}
            </p>
          </div>
          <div>
            <p>
              آدرس کاربر:
            </p>
            <p>
              {user.homeAdderess?user.homeAdderess:'خالی'}
            </p>
          </div>
        </Row>
      </CardBody>
    </Card>
  )
}
