//Bar chart generation
const generatebarchart = (canvesid,lables,chart_datalist_array,xaxisname,yaxisname,charttitle,backgroundColorlist=null,borderColorlist=null) =>{
    const ctx = document.getElementById(canvesid);
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: lables,
            datasets: [
                {
                    label: "Employee Age range analysis",
                    data: chart_datalist_array,
                    backgroundColor:backgroundColorlist!=null? backgroundColorlist : [
                        "rgba(100, 120, 233, 0.79)",
                        "rgba(100, 107, 205, 0.79)",
                        "rgba(100, 97, 187, 0.79)",
                        "rgba(100, 84, 161, 0.79)",
                        "rgba(100, 71, 135, 0.79)",
                        "rgba(100, 58, 110, 0.79)",
                        "rgba(100, 49, 92, 0.79)"
                    ],
                    borderColor: borderColorlist!=null? borderColorlist : [
                        "rgba(100, 100, 200, 1)",
                        "rgba(100, 90, 180, 1)",
                        "rgba(100, 80, 160, 1)",
                        "rgba(100, 70, 140, 1)",
                        "rgba(100, 60, 120, 1)",
                        "rgba(100, 50, 100, 1)",
                        "rgba(100, 40, 80, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: "#fff" // Set X-axis labels color to white
                    },
                    title: {
                        display: true,  // Show the X-axis label
                        text: xaxisname,  // The label text for X-axis
                        color: "#fff",  // Set X-axis label color to white
                        font: {
                            size: 14,  // Adjust the font size for X-axis
                            weight: 'bold'  // Make the label bold
                        }
                    },
                    grid: {
                        color: "#898989"  // Set X-axis grid line color to white
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#fff" // Set Y-axis labels color to white
                    },
                    title: {
                        display: true,  // Show the Y-axis label
                        text: yaxisname,  // The label text for Y-axis
                        color: "#fff",  // Set Y-axis label color to white
                        font: {
                            size: 14,  // Adjust the font size for Y-axis
                            weight: 'bold'  // Make the label bold
                        }
                    },
                    grid: {
                        color: "#898989"  // Set Y-axis grid line color to white
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#fff" // Set legend text color to white
                    }
                },
                tooltip: {
                    titleColor: "#fff", // Set tooltip title color to white
                    bodyColor: "#fff",  // Set tooltip body text color to white
                    backgroundColor: "rgba(0, 0, 0, 0.8)" // Darken tooltip background
                },
                title: {
                    display: true, // Show the chart title
                    text: charttitle,  // The title text
                    color: "#fff",  // Set the title color to white
                    font: {
                        size: 18,  // Adjust the font size for the title
                        weight: 'bold'  // Make the title bold
                    },
                    padding: {
                        top: 10,  // Add some padding above the title
                        bottom: 20  // Add some padding below the title
                    }
                }
            }
        }
    });
}

//Donut Char Generation
const generatedoughnutchart = (chartcanvers,chart_datalist,chart_lables,chartname,dataset_move_name,backgroundColorlist=null,borderColorlist=null) =>{

    const doughnutchart = document.getElementById(chartcanvers);

    new Chart(doughnutchart, {
        type: "doughnut",
        data: {
            labels: chart_lables,
            datasets: [
                {
                    label: dataset_move_name,
                    data: chart_datalist,
                    backgroundColor: backgroundColorlist!=null? backgroundColorlist : [
                        "rgba(13, 110, 253, 0.79)",
                        "rgba(220, 53, 69, 0.79)",
                        "rgba(25, 135, 84, 0.79)",
                        "rgba(255, 193, 7, 0.79)",
                        "rgba(23, 162, 184, 0.79)",
                        "rgba(108, 117, 125, 0.79)",
                        "rgba(33, 37, 41, 0.79)"
                    ],
                    borderColor: borderColorlist!=null? borderColorlist : [
                        "rgba(13, 110, 253, 1)",
                        "rgba(220, 53, 69, 1)",
                        "rgba(25, 135, 84, 1)",
                        "rgba(255, 193, 7, 1)",
                        "rgba(23, 162, 184, 1)",
                        "rgba(108, 117, 125, 1)",
                        "rgba(33, 37, 41, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#fff" // Set legend text color to white
                    }
                },
                title: {
                    display: true,
                    text: chartname,
                    color: "#fff", // Set title color to white
                    font: {
                        size: 16, // Adjust the size if needed
                        family: "Arial" // Optional: specify a font family
                    }
                }
            }
        }
    });
}

const generatelinechart = (chartcanvers,lables,chart_datalist_array,xaxisname,yaxisname,charttitle,straightline,backgroundColorlist=null,borderColorlist=null) =>{

    const linecanvers = document.getElementById(chartcanvers);
    new Chart(linecanvers, {
        type: "line",
        data: {
            labels: lables,
            datasets: [
                {
                    label: "Employee Age range analysis",
                    data: chart_datalist_array,
                    backgroundColor:backgroundColorlist!=null? backgroundColorlist : [
                        "rgba(100, 120, 233, 0.79)",
                        "rgba(100, 107, 205, 0.79)",
                        "rgba(100, 97, 187, 0.79)",
                        "rgba(100, 84, 161, 0.79)",
                        "rgba(100, 71, 135, 0.79)",
                        "rgba(100, 58, 110, 0.79)",
                        "rgba(100, 49, 92, 0.79)"
                    ],
                    borderColor: borderColorlist!=null? borderColorlist : [
                        "rgba(100, 100, 200, 1)",
                        "rgba(100, 90, 180, 1)",
                        "rgba(100, 80, 160, 1)",
                        "rgba(100, 70, 140, 1)",
                        "rgba(100, 60, 120, 1)",
                        "rgba(100, 50, 100, 1)",
                        "rgba(100, 40, 80, 1)"
                    ],
                    fill: false,
                    cubicInterpolationMode: straightline ? '': 'monotone',
                    tension: straightline ? 0:0.4,
                    borderWidth: 3
                }
            ]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: "#fff" // Set X-axis labels color to white
                    },
                    title: {
                        display: true,  // Show the X-axis label
                        text: xaxisname,  // The label text for X-axis
                        color: "#fff",  // Set X-axis label color to white
                        font: {
                            size: 14,  // Adjust the font size for X-axis
                            weight: 'bold'  // Make the label bold
                        }
                    },
                    grid: {
                        color: "#898989"  // Set X-axis grid line color to white
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#fff" // Set Y-axis labels color to white
                    },
                    title: {
                        display: true,  // Show the Y-axis label
                        text: yaxisname,  // The label text for Y-axis
                        color: "#fff",  // Set Y-axis label color to white
                        font: {
                            size: 14,  // Adjust the font size for Y-axis
                            weight: 'bold'  // Make the label bold
                        }
                    },
                    grid: {
                        color: "#898989"  // Set Y-axis grid line color to white
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#fff" // Set legend text color to white
                    }
                },
                tooltip: {
                    titleColor: "#fff", // Set tooltip title color to white
                    bodyColor: "#fff",  // Set tooltip body text color to white
                    backgroundColor: "rgba(0, 0, 0, 0.8)" // Darken tooltip background
                },
                title: {
                    display: true, // Show the chart title
                    text: charttitle,  // The title text
                    color: "#fff",  // Set the title color to white
                    font: {
                        size: 18,  // Adjust the font size for the title
                        weight: 'bold'  // Make the title bold
                    },
                    padding: {
                        top: 10,  // Add some padding above the title
                        bottom: 20  // Add some padding below the title
                    }
                },

            },
            interaction: {
                intersect: false,
            },
        }
    });
}

