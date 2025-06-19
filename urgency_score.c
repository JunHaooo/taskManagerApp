#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]){
    if (argc < 3) {
        printf("Usage: ./urgency_score <deadline> <priority>\n");
        return 1;
    } //argc is argument count, //argv is argument vector to store an array of arguments

    int deadline = atoi(argv[1]);
    int priority = atoi(argv[2]);

    int score = (priority * 10) / deadline;
    printf("%d\n", score);
    return 0;
}