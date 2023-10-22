#include<stdio.h>
#include<sys/types.h>
#include<unistd.h>
#include <iostream>
using namespace std;

int main()
{
if(fork() || fork())
{
fork();
}
cout<<"hello";
return 0;
}
