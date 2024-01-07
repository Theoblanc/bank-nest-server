import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function setupDoc(app) {
  const config = new DocumentBuilder()
    .setTitle(`Bank API Server`)
    .setDescription('All resources using REST interface')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);
}
