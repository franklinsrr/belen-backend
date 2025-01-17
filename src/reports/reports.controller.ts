import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';
import { QueryParams } from '@users/decorators/query-params.decorator';
import { IQueryParams } from '@common/interfaces/decorators';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('test')
  async test(@Res() response: Response) {
    const pdfDoc = await this.reportsService.test();

    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'test';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('users')
  async usersReport(
    @QueryParams() queryParams: IQueryParams,
    @Res() response: Response,
  ) {
    const pdfDoc = await this.reportsService.usersReport(queryParams);

    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'reporte de usuarios';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
