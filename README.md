# BANK-NEST-SERVER

This project is a portfolio showcasing the implementation of Event-Driven Architecture (EDA) and Command Query Responsibility Segregation (CQRS) patterns within a Nest.js backend system. The goal of this portfolio is to demonstrate the scalability, flexibility, and efficiency of using EDA and CQRS in modern web applications.

## Overview

The portfolio project is structured around a core backend system built with Nest.js, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. By leveraging the EDA and CQRS patterns, the project aims to separate the read and write operations, ensuring high performance and maintainability, while also efficiently handling real-time data updates through events.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

- **User Management**: User registration, authentication, and profile management.
- **Account Management**: Create and manage bank accounts, including balance inquiries.
- **Transaction Management**: Perform and track transactions such as deposits, withdrawals, and transfers.
- **Transaction History**: View and manage transaction history with detailed status tracking.
- **Real-time Updates**: Event-driven architecture for real-time data updates.
- **CQRS**: Separate command and query responsibilities for improved scalability and maintainability.


주요 요구사항

1. 계좌 생성 및 관리

	•	고객은 여러 은행 계좌를 가질 수 있으며, 각 계좌는 고유한 계좌 번호와 잔액 정보를 포함합니다.
	•	계좌는 개인 및 법인용으로 나뉘며, 계좌 유형에 따라 일일 최대 이체 한도가 다르게 적용됩니다.
	•	신규 계좌 생성 시 초기 입금이 필요하며, 계좌 개설 후 일정 시간이 지나야 일부 거래 기능이 활성화됩니다.

2. 이체 및 트랜잭션 관리

	•	내부 이체: 같은 은행 내 다른 계좌로의 이체는 실시간으로 처리되며, 트랜잭션을 통해 잔액이 즉시 반영됩니다.
	•	외부 이체: 다른 은행으로의 이체는 지연 전송으로 구현되며, 송금 신청 후 일정 시간이 경과해야 완료됩니다.
	•	TCC (Try-Confirm-Cancel) 방식의 트랜잭션을 도입하여 이체 도중 실패할 경우, 보상 트랜잭션을 통해 데이터의 일관성을 보장합니다.
	•	이체 실패 시에는 원거래 취소 트랜잭션을 실행하여 송금 잔액을 복원합니다.

3. 거래 내역 관리 및 분산 잠금 제어

	•	모든 거래는 거래 내역으로 기록되어야 하며, 거래 내역은 시간 순서대로 정렬되어 고객이 조회할 수 있습니다.
	•	**분산 잠금(DLM)**을 적용해 동일 계좌에 대해 동시 접근으로 인한 데이터 충돌을 방지합니다.
	•	대량의 동시 요청 처리 중에도 각 거래가 데이터 일관성을 유지하도록 낙관적 락 또는 비관적 락을 사용합니다.

4. 이체 한도 및 부정거래 탐지

	•	계좌별 일일 이체 한도를 관리하며, 한도 초과 시 경고를 보내거나 거래를 차단합니다.
	•	특정 계좌가 짧은 시간 동안 비정상적으로 많은 거래를 발생시키면, 부정 거래 탐지(AML, Anti-Money Laundering) 로직이 작동하여 이체를 잠시 중단하고 관리자의 승인을 기다립니다.
	•	부정 거래 탐지는 일정 시간 내 다수의 출금이 발생하는 경우나, 비정상적인 금액 이체가 감지될 때 경고 알림을 발생시킵니다.

5. 이자 계산 및 자동 이체

	•	이자 계산: 매월 말일에 잔액에 따른 이자가 계산되어 계좌에 추가됩니다.
	•	자동 이체 기능: 고객이 설정한 일정에 따라 자동으로 특정 금액을 지정된 계좌로 이체할 수 있는 기능을 제공합니다.
	•	자동 이체의 실패 시, 고객에게 알림이 발송되며 지정된 재시도 횟수만큼 재시도 후 최종 실패 처리합니다.


## Installation

```bash
$ yarn install
```
## Environment Variables
```bash
# .env
# Application
PORT=

# Postgres
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_SYNC=
DATABASE_LOGGING=

# Redis
REDIS_HOST=
REDIS_PORT=

# RabbitMQ

RABBITMQ_USER=
RABBITMQ_PASSWORD=
RABBITMQ_HOST=
RABBITMQ_PORT=
```

## Running the app
```bash
$ docker-compose up
```

## Test
```bash
$ yarn run test
```

## ERD (Entity Relationship Diagram)
Below is the Entity Relationship Diagram (ERD) for the project's database schema:
![ERD](./assets/erd.png)
