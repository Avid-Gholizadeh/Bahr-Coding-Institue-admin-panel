import React from 'react'
import {Card, CardBody, CardTitle, Row, Col, Badge} from 'reactstrap'
import fMoment from 'moment-jalaali'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'

export function ArticleDetailsTab({user, singleArticle}) {
    return (
        <Card className="p-2">
            <CardBody>
                <Row>
                    <Col md="6">
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> کلید واژه :</span>
                            <span>{singleArticle.keyword}</span>
                        </li>
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> تعداد مورد علاقه :</span>
                            <span>{singleArticle.inUsersFavoriteCount}</span>
                        </li>
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> اسلایدر :</span>
                            <Badge
                                color={singleArticle.isSlider ? 'light-success' : 'light-danger'}
                            >
                                {singleArticle.isSlider ? 'بله' : 'خیر'}
                            </Badge>
                        </li>
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> تعداد لایک :</span>
                            <span>{singleArticle.currentLikeCount}</span>
                        </li>
                    </Col>

                    <Col md="6">
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> لینک کوتاه :</span>
                            <span>{singleArticle.shortLink || 'نامشخص'}</span>
                        </li>
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> تاریخ انتشار :</span>
                            <span>{convertGrigorianDateToJalaali(singleArticle.insertDate)}</span>
                        </li>
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> آخرین بروزرسانی :</span>
                            <span>{convertGrigorianDateToJalaali(singleArticle.updateDate)}</span>
                        </li>
                        <li className="mb-75">
                            <span className="fw-bolder me-50"> تعداد دیسلایک :</span>
                            <span>{singleArticle.currentDissLikeCount}</span>
                        </li>
                    </Col>
                    <Col>
                        <li className="mb-75">
                            <p className="fw-bolder me-50"> عنوان گوگل :</p>
                            <span>{singleArticle.googleTitle}</span>
                        </li>
                        <li className="mb-75">
                            <p className="fw-bolder me-50"> توضیحات گوگل :</p>
                            <span>{singleArticle.googleDescribe}</span>
                        </li>
                        <li className="mb-75">
                            <p className="fw-bolder me-50"> توضیحات کوتاه :</p>
                            <span>{singleArticle.miniDescribe}</span>
                        </li>
                        <li className="mb-75">
                            <p className="fw-bolder me-50"> توضیحات اصلی :</p>
                            <span>{singleArticle.describe}</span>
                        </li>
                    </Col>

                    {/* <div>
                        <p>درباره کاربر:</p>
                        <p>{user.userAbout}</p>
                    </div>
                    <div>
                        <p>آدرس کاربر:</p>
                        <p>{user.homeAdderess ? user.homeAdderess : 'خالی'}</p>
                    </div> */}
                </Row>
            </CardBody>
        </Card>
    )
}
