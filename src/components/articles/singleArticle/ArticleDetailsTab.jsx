import React from 'react'
import {Card, CardBody, Row, Col, Badge} from 'reactstrap'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'
import {RichTextDecoder} from '@Components/common/RichTextDecoder'

export function ArticleDetailsTab({singleArticle}) {
    //
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
                    <Col className="mt-1">
                        <li className="mb-75">
                            <p className="fw-bolder fs-4 me-50"> عنوان گوگل :</p>
                            <span>{singleArticle.googleTitle}</span>
                        </li>
                        <li className="mb-75">
                            <p className="fw-bolder fs-4 me-50"> توضیحات گوگل :</p>
                            <span>{singleArticle.googleDescribe}</span>
                        </li>
                        <li className="mb-75">
                            <p className="fw-bolder fs-4 me-50"> توضیحات کوتاه :</p>
                            <span>{singleArticle.miniDescribe}</span>
                        </li>
                        <li className="mb-75">
                            <p className="fw-bolder fs-4 me-50"> توضیحات اصلی :</p>

                            <RichTextDecoder content={singleArticle.describe} />
                        </li>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
