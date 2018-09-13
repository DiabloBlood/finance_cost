#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFSIZE 150 /* arbitary size*/

int main() {
    struct sockaddr_in serv;
    char buff[BUFFSIZE];
    int sockfd, n;

    if((sockfd = socket(PF_INET, SOCK_DGRAM, 0)) < 0) {
        err_sys("socket error");
    }

    bzero((char *) &serv, sizeof(serv));
    serv.sin_family = AF_INET;
    serv.sin_addr.s_addr = inet_addr("140.252.1.32");
    serv.sin_port = htons(13);

    if(sendto(sockfd, buff, BUFFSIZE, 0, (struct sockaddr *) &serv, sizeof(serv)) != BUFFSIZE) {
        err_sys("sendto error");
    }

    n = recvfrom(sockfd, buff, BUFFSIZE, 0, (struct sockaddr *) NULL, (int *) NULL);
    if(n < 2) {
        err_sys("recvfrom error");
    }
    buff[n - 2] = 0;
    printf("%s\n", buff);
    exit(0);
}